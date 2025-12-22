#include <QApplication>
#include <QSurfaceFormat>
#include <QOpenGLWidget>
#include <QOpenGLFunctions_3_3_Core>
#include <QOpenGLShaderProgram>
#include <QMainWindow>
#include <iostream>
#include <array>

class GLWidget : public QOpenGLWidget, protected QOpenGLFunctions_3_3_Core
{
public:
    GLWidget(QWidget* parent = nullptr) : QOpenGLWidget(parent) {}

protected:
    void initializeGL() override
    {
        initializeOpenGLFunctions();
        glClearColor(0.8f, 0.2f, 0.5f, 1.0f);
        std::cout << "✔ OpenGL 3.3 context valid\n";

        // Vertex Shader
        const char* vertexShaderSource = R"(
            #version 330 core
            layout(location = 0) in vec3 pos;
            void main() {
                gl_Position = vec4(pos, 1.0);
            }
        )";

        // Fragment Shader
        const char* fragmentShaderSource = R"(
            #version 330 core
            out vec4 fragColor;
            void main() {
                fragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        )";

        shaderProgram.addShaderFromSourceCode(QOpenGLShader::Vertex, vertexShaderSource);
        shaderProgram.addShaderFromSourceCode(QOpenGLShader::Fragment, fragmentShaderSource);
        if(!shaderProgram.link()) {
            std::cerr << "Shader link error: " << shaderProgram.log().toStdString() << "\n";
        } else {
            std::cout << "✔ Shader program linked\n";
        }

        // Triangle vertices
        std::array<float, 9> vertices = {
            0.0f,  0.6f, 0.0f,
           -0.6f, -0.6f, 0.0f,
            0.6f, -0.6f, 0.0f
        };

        // Create VAO
        glGenVertexArrays(1, &VAO);
        glBindVertexArray(VAO);

        // Create VBO
        glGenBuffers(1, &VBO);
        glBindBuffer(GL_ARRAY_BUFFER, VBO);
        glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices.data(), GL_STATIC_DRAW);

        // Link vertex attributes
        glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), nullptr);
        glEnableVertexAttribArray(0);

        // Unbind
        glBindBuffer(GL_ARRAY_BUFFER, 0);
        glBindVertexArray(0);
    }

    void paintGL() override
    {
        glClear(GL_COLOR_BUFFER_BIT);
        shaderProgram.bind();
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);
        glBindVertexArray(0);
        shaderProgram.release();
    }

private:
    QOpenGLShaderProgram shaderProgram;
    GLuint VAO = 0;
    GLuint VBO = 0;
};

class MainWindow : public QMainWindow
{
public:
    MainWindow()
    {
        setWindowTitle("Qt6 OpenGL 3.3 Triangle");
        resize(600, 600);
        setCentralWidget(new GLWidget(this));
    }
};

int main(int argc, char** argv)
{
    QApplication app(argc, argv);

    // Request OpenGL 3.3 Core Profile
    QSurfaceFormat format;
    format.setVersion(3, 3);
    format.setProfile(QSurfaceFormat::CoreProfile);
    format.setDepthBufferSize(24);
    format.setSwapBehavior(QSurfaceFormat::DoubleBuffer);
    QSurfaceFormat::setDefaultFormat(format);

    MainWindow window;
    window.show();

    return app.exec();
}

