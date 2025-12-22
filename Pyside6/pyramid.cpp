#include <QGuiApplication>
#include <Qt3DCore/QEntity>
#include <Qt3DExtras/Qt3DWindow>
#include <Qt3DRender/QCamera>
#include <Qt3DExtras/QForwardRenderer>
#include <Qt3DExtras/QPhongMaterial>
#include <Qt3DCore/QTransform>
#include <Qt3DRender/QGeometryRenderer>
#include <Qt3DCore/QGeometry>
#include <Qt3DCore/QBuffer>
#include <Qt3DCore/QAttribute>
#include <Qt3DAnimation/QAnimationController>
#include <Qt3DAnimation/QKeyframeAnimation>
#include <Qt3DAnimation/QMorphTarget>
#include <QColor>
#include <QTimer>
#include <array>
#include <iostream>

Qt3DCore::QEntity* createPyramid(Qt3DCore::QEntity* parent)
{
    using namespace Qt3DRender;
    using namespace Qt3DCore;

    // Vertices of a pyramid (tip + base)
    std::array<float, 15> vertices = {
         0.0f,  0.5f,  0.0f,  // tip
        -0.5f, -0.5f,  0.5f,  // base front-left
         0.5f, -0.5f,  0.5f,  // base front-right
         0.5f, -0.5f, -0.5f,  // base back-right
        -0.5f, -0.5f, -0.5f   // base back-left
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

    QGeometry* geometry = new QGeometry(parent);

    // Vertex buffer (Qt 6 removed the buffer type parameter)
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

    // Transform
    Qt3DCore::QTransform* transform = new Qt3DCore::QTransform();

    // Entity
    QEntity* pyramidEntity = new QEntity(parent);
    pyramidEntity->addComponent(pyramidRenderer);
    pyramidEntity->addComponent(material);
    pyramidEntity->addComponent(transform);

    // Rotation animation using QTimer (Qt 6 approach)
    QTimer* timer = new QTimer(pyramidEntity);
    static float angle = 0.0f;
    QObject::connect(timer, &QTimer::timeout, transform, [transform]() {
        angle += 1.44f; // 360 degrees / 5 seconds = 72 deg/sec, 20ms timer = 1.44 deg/tick
        if (angle >= 360.0f) angle -= 360.0f;
        transform->setRotationY(angle);
    });
    timer->start(20); // 50 FPS

    return pyramidEntity;
}

int main(int argc, char** argv)
{
    QGuiApplication app(argc, argv);

    // 3D Window
    Qt3DExtras::Qt3DWindow* view = new Qt3DExtras::Qt3DWindow();

    // Set clear color
    Qt3DExtras::QForwardRenderer* frameGraph =
        qobject_cast<Qt3DExtras::QForwardRenderer*>(view->defaultFrameGraph());
    if(frameGraph)
        frameGraph->setClearColor(QColor(204, 51, 128)); // pink

    view->resize(600, 600);
    view->show();

    // Root entity
    Qt3DCore::QEntity* rootEntity = new Qt3DCore::QEntity();

    // Add pyramid
    createPyramid(rootEntity);

    // Camera
    Qt3DRender::QCamera* camera = view->camera();
    camera->lens()->setPerspectiveProjection(45.0f, 1.0f, 0.1f, 1000.0f);
    camera->setPosition(QVector3D(0, 1.0f, 3.0f));
    camera->setViewCenter(QVector3D(0, 0, 0));

    view->setRootEntity(rootEntity);

    return app.exec();
}
