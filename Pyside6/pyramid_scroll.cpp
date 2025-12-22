#include <QGuiApplication>
#include <Qt3DCore/QEntity>
#include <Qt3DExtras/Qt3DWindow>
#include <Qt3DRender/QCamera>
#include <Qt3DExtras/QForwardRenderer>
#include <Qt3DExtras/QPhongMaterial>
#include <Qt3DExtras/QOrbitCameraController>
#include <Qt3DCore/QTransform>
#include <Qt3DRender/QGeometryRenderer>
#include <Qt3DCore/QGeometry>
#include <Qt3DCore/QBuffer>
#include <Qt3DCore/QAttribute>
#include <Qt3DRender/QObjectPicker>
#include <Qt3DRender/QPickEvent>
#include <Qt3DInput/QInputSettings>
#include <QColor>
#include <QMouseEvent>
#include <QWheelEvent>
#include <array>
#include <vector>
#include <iostream>

// Structure to hold edge line entities
struct EdgeLines {
    std::vector<Qt3DCore::QEntity*> edges;
    std::vector<Qt3DExtras::QPhongMaterial*> materials;
    int selectedEdge = -1;
};

Qt3DCore::QEntity* createEdgeLine(Qt3DCore::QEntity* parent, 
                                   const QVector3D& start, 
                                   const QVector3D& end,
                                   const QColor& color)
{
    using namespace Qt3DRender;
    using namespace Qt3DCore;

    std::array<float, 6> vertices = {
        start.x(), start.y(), start.z(),
        end.x(), end.y(), end.z()
    };

    QGeometry* geometry = new QGeometry(parent);

    QBuffer* vertexDataBuffer = new QBuffer(geometry);
    vertexDataBuffer->setData(QByteArray(reinterpret_cast<const char*>(vertices.data()),
                                         vertices.size() * sizeof(float)));

    QAttribute* positionAttribute = new QAttribute();
    positionAttribute->setName(QAttribute::defaultPositionAttributeName());
    positionAttribute->setVertexBaseType(QAttribute::Float);
    positionAttribute->setVertexSize(3);
    positionAttribute->setAttributeType(QAttribute::VertexAttribute);
    positionAttribute->setBuffer(vertexDataBuffer);
    positionAttribute->setByteStride(3 * sizeof(float));
    positionAttribute->setCount(2);
    geometry->addAttribute(positionAttribute);

    QGeometryRenderer* lineRenderer = new QGeometryRenderer();
    lineRenderer->setGeometry(geometry);
    lineRenderer->setPrimitiveType(QGeometryRenderer::Lines);

    Qt3DExtras::QPhongMaterial* material = new Qt3DExtras::QPhongMaterial();
    material->setDiffuse(color);
    material->setAmbient(color);

    QEntity* lineEntity = new QEntity(parent);
    lineEntity->addComponent(lineRenderer);
    lineEntity->addComponent(material);

    return lineEntity;
}

EdgeLines* createPyramidWithEdges(Qt3DCore::QEntity* parent, Qt3DCore::QTransform* sharedTransform)
{
    using namespace Qt3DRender;
    using namespace Qt3DCore;

    // Container entity
    QEntity* pyramidContainer = new QEntity(parent);

    // Vertices of a pyramid (tip + base)
    std::array<float, 15> vertices = {
         0.0f,  0.5f,  0.0f,  // 0: tip
        -0.5f, -0.5f,  0.5f,  // 1: base front-left
         0.5f, -0.5f,  0.5f,  // 2: base front-right
         0.5f, -0.5f, -0.5f,  // 3: base back-right
        -0.5f, -0.5f, -0.5f   // 4: base back-left
    };

    // Triangle indices (4 sides + base as 2 triangles)
    std::array<unsigned int, 18> indices = {
        0,1,2,  // front
        0,2,3,  // right
        0,3,4,  // back
        0,4,1,  // left
        1,2,4,  // base triangle 1
        2,3,4   // base triangle 2
    };

    QGeometry* geometry = new QGeometry(pyramidContainer);

    // Vertex buffer
    QBuffer* vertexDataBuffer = new QBuffer(geometry);
    vertexDataBuffer->setData(QByteArray(reinterpret_cast<const char*>(vertices.data()),
                                         vertices.size() * sizeof(float)));

    QAttribute* positionAttribute = new QAttribute();
    positionAttribute->setName(QAttribute::defaultPositionAttributeName());
    positionAttribute->setVertexBaseType(QAttribute::Float);
    positionAttribute->setVertexSize(3);
    positionAttribute->setAttributeType(QAttribute::VertexAttribute);
    positionAttribute->setBuffer(vertexDataBuffer);
    positionAttribute->setByteStride(3 * sizeof(float));
    positionAttribute->setCount(vertices.size()/3);
    geometry->addAttribute(positionAttribute);

    // Index buffer
    QBuffer* indexDataBuffer = new QBuffer(geometry);
    indexDataBuffer->setData(QByteArray(reinterpret_cast<const char*>(indices.data()),
                                        indices.size() * sizeof(unsigned int)));

    QAttribute* indexAttribute = new QAttribute();
    indexAttribute->setAttributeType(QAttribute::IndexAttribute);
    indexAttribute->setVertexBaseType(QAttribute::UnsignedInt);
    indexAttribute->setBuffer(indexDataBuffer);
    indexAttribute->setCount(indices.size());
    geometry->addAttribute(indexAttribute);

    // Geometry renderer
    QGeometryRenderer* pyramidRenderer = new QGeometryRenderer();
    pyramidRenderer->setGeometry(geometry);
    pyramidRenderer->setPrimitiveType(QGeometryRenderer::Triangles);

    // Material
    Qt3DExtras::QPhongMaterial* material = new Qt3DExtras::QPhongMaterial();
    material->setDiffuse(Qt::white);

    // Pyramid entity
    QEntity* pyramidEntity = new QEntity(pyramidContainer);
    pyramidEntity->addComponent(pyramidRenderer);
    pyramidEntity->addComponent(material);
    pyramidEntity->addComponent(sharedTransform);

    // Create edge lines
    EdgeLines* edgeLines = new EdgeLines();
    
    // Define pyramid edges (vertex pairs)
    std::vector<std::pair<int, int>> edgePairs = {
        {0, 1}, {0, 2}, {0, 3}, {0, 4},  // tip to base corners
        {1, 2}, {2, 3}, {3, 4}, {4, 1}   // base edges
    };

    // Convert vertex indices to 3D points
    auto getVertex = [&vertices](int idx) {
        return QVector3D(vertices[idx*3], vertices[idx*3+1], vertices[idx*3+2]);
    };

    // Create edge line entities
    for (const auto& edge : edgePairs) {
        QEntity* edgeEntity = createEdgeLine(pyramidContainer, 
                                             getVertex(edge.first), 
                                             getVertex(edge.second),
                                             Qt::yellow);
        edgeEntity->addComponent(sharedTransform);
        
        // Add picker to edge
        Qt3DRender::QObjectPicker* picker = new Qt3DRender::QObjectPicker(edgeEntity);
        picker->setEnabled(true);
        edgeEntity->addComponent(picker);
        
        edgeLines->edges.push_back(edgeEntity);
        
        // Store material for later color changes
        auto components = edgeEntity->components();
        for (auto* comp : components) {
            if (auto* mat = qobject_cast<Qt3DExtras::QPhongMaterial*>(comp)) {
                edgeLines->materials.push_back(mat);
                break;
            }
        }
    }

    return edgeLines;
}

// Custom window class to capture mouse events
class CustomQt3DWindow : public Qt3DExtras::Qt3DWindow
{
protected:
    void mousePressEvent(QMouseEvent* event) override
    {
        std::cout << "Mouse Press: button=" << event->button() 
                  << " pos=(" << event->pos().x() << "," << event->pos().y() << ")" << std::endl;
        Qt3DExtras::Qt3DWindow::mousePressEvent(event);
    }
    
    void mouseReleaseEvent(QMouseEvent* event) override
    {
        std::cout << "Mouse Release: button=" << event->button() << std::endl;
        Qt3DExtras::Qt3DWindow::mouseReleaseEvent(event);
    }
    
    void mouseMoveEvent(QMouseEvent* event) override
    {
        std::cout << "Mouse Move: pos=(" << event->pos().x() << "," << event->pos().y() << ")" << std::endl;
        Qt3DExtras::Qt3DWindow::mouseMoveEvent(event);
    }
    
    void wheelEvent(QWheelEvent* event) override
    {
        std::cout << "Wheel Event: angleDelta=(" << event->angleDelta().x() 
                  << "," << event->angleDelta().y() << ")" << std::endl;
        Qt3DExtras::Qt3DWindow::wheelEvent(event);
    }
};

int main(int argc, char** argv)
{
    QGuiApplication app(argc, argv);

    // 3D Window with mouse event logging
    CustomQt3DWindow* view = new CustomQt3DWindow();

    // Set clear color
    Qt3DExtras::QForwardRenderer* frameGraph =
        qobject_cast<Qt3DExtras::QForwardRenderer*>(view->defaultFrameGraph());
    if(frameGraph)
        frameGraph->setClearColor(QColor(204, 51, 128)); // pink

    view->resize(600, 600);
    view->show();

    // Root entity
    Qt3DCore::QEntity* rootEntity = new Qt3DCore::QEntity();

    // Shared transform for rotation
    Qt3DCore::QTransform* transform = new Qt3DCore::QTransform();

    // Add pyramid with edges
    EdgeLines* edgeLines = createPyramidWithEdges(rootEntity, transform);

    // Setup edge picking
    for (size_t i = 0; i < edgeLines->edges.size(); ++i) {
        Qt3DCore::QEntity* edge = edgeLines->edges[i];
        auto components = edge->components();
        
        for (auto* comp : components) {
            if (auto* picker = qobject_cast<Qt3DRender::QObjectPicker*>(comp)) {
                QObject::connect(picker, &Qt3DRender::QObjectPicker::clicked, 
                    [edgeLines, i]() {
                        // Deselect previous edge
                        if (edgeLines->selectedEdge >= 0) {
                            edgeLines->materials[edgeLines->selectedEdge]->setDiffuse(Qt::yellow);
                            edgeLines->materials[edgeLines->selectedEdge]->setAmbient(Qt::yellow);
                        }
                        
                        // Select new edge
                        if (edgeLines->selectedEdge == static_cast<int>(i)) {
                            // Toggle off if clicking same edge
                            edgeLines->selectedEdge = -1;
                        } else {
                            edgeLines->selectedEdge = static_cast<int>(i);
                            edgeLines->materials[i]->setDiffuse(Qt::green);
                            edgeLines->materials[i]->setAmbient(Qt::green);
                            std::cout << "Selected edge " << i << std::endl;
                        }
                    });
                break;
            }
        }
    }

    // Camera
    Qt3DRender::QCamera* camera = view->camera();
    camera->lens()->setPerspectiveProjection(45.0f, 1.0f, 0.1f, 1000.0f);
    camera->setPosition(QVector3D(0, 1.0f, 3.0f));
    camera->setViewCenter(QVector3D(0, 0, 0));

    // Set root entity first
    view->setRootEntity(rootEntity);

    // Orbit camera controller for rotation with middle mouse button
    // Must be created AFTER setting root entity
    Qt3DExtras::QOrbitCameraController* cameraController = 
        new Qt3DExtras::QOrbitCameraController(rootEntity);
    cameraController->setCamera(camera);
    cameraController->setLinearSpeed(50.0f);  // Enable zoom with scroll wheel
    cameraController->setLookSpeed(180.0f);  // Control rotation sensitivity

    return app.exec();
}
