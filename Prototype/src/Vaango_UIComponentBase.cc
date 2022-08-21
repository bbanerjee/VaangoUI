#include <Vaango_UIComponentBase.h>

#define STB_IMAGE_IMPLEMENTATION
#include <stb_image.h>

using namespace VaangoUI;

Vaango_UIIcon 
Vaango_UIComponentBase::creatIconTextureFromImageFile(const std::string& fileName)
{
  Vaango_UIIcon icon;
  int textureComp;
  void* textureData =
    stbi_load(fileName.c_str(), &icon.width, &icon.height, &textureComp, 0);

  if (textureData == nullptr || textureComp < 3) {
    std::cout << "Failed to load image: " << fileName << std::endl;
    icon.id = -1;
    return icon;
  }

  glGenTextures(1, &icon.id);
  glBindTexture(GL_TEXTURE_2D, icon.id);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
  glTexImage2D(GL_TEXTURE_2D, 0, textureComp == 3 ? GL_RGB : GL_RGBA,
                icon.width, icon.height, 0,
                textureComp == 3 ? GL_RGB : GL_RGBA, GL_UNSIGNED_BYTE,
                static_cast<GLubyte*>(textureData));
  glBindTexture(GL_TEXTURE_2D, 0);

  stbi_image_free(textureData);

  return icon;
}

