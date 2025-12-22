#include <QGuiApplication>
#include <Qt3DCore/QEntity>
#include <Qt3DExtras/Qt3DWindow>
#include <Qt3DExtras/QPhongMaterial>
#include <Qt3DExtras/QConeMesh>
#include <Qt3DCore/QTransform>
#include <Qt3DRender/QCamera>
#include <Qt3DExtras/QForwardRenderer>
#include <QColor>
#include <iostream>

int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);

    // 3D Window
    Qt3DExtras::Qt3DWindow *view = new Qt3DExtras::Qt3DWindow();

    // Cast defaultFrameGraph to QForwardRenderer to set clear color
    Qt3DExtras::QForwardRenderer *frameGraph =
        qobject_cast<Qt3DExtras::QForwardRenderer*>(view->defaultFrameGraph());
    if(frameGraph)
        frameGraph->setClearColor(QColor(204, 51, 128)); // Pink background

    view->resize(600, 600);
    view->show();

    // Root entity
    Qt3DCore::QEntity *rootEntity = new Qt3DCore::QEntity();

    // Triangle geometry using QConeMesh
    Qt3DExtras::QConeMesh *triangleMesh = new Qt3DExtras::QConeMesh();
    triangleMesh->setTopRadius(0.0f);
    triangleMesh->setBottomRadius(0.6f);
    triangleMesh->setLength(0.6f);
    triangleMesh->setRings(1);
    triangleMesh->setSlices(3); // Makes a triangle

    Qt3DExtras::QPhongMaterial *material = new Qt3DExtras::QPhongMaterial();
    material->setDiffuse(Qt::white);

    Qt3DCore::QTransform *transform = new Qt3DCore::QTransform();
    transform->setRotationX(-90.0f); // Rotate cone to face camera

    Qt3DCore::QEntity *triangleEntity = new Qt3DCore::QEntity(rootEntity);
    triangleEntity->addComponent(triangleMesh);
    triangleEntity->addComponent(material);
    triangleEntity->addComponent(transform);

    // Camera
    Qt3DRender::QCamera *camera = view->camera();
    camera->lens()->setPerspectiveProjection(45.0f, 1.0f, 0.1f, 1000.0f);
    camera->setPosition(QVector3D(0.0f, 0.0f, 2.0f));
    camera->setViewCenter(QVector3D(0.0f, 0.0f, 0.0f));

    // Set root object of the scene
    view->setRootEntity(rootEntity);

    return app.exec();
}

