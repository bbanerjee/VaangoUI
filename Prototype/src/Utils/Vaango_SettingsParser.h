#ifndef __Vaango_SETTINGS_PARSER_H__
#define __Vaango_SETTINGS_PARSER_H__

#include "ini.h"

#include <algorithm>
#include <fstream>
#include <map>
#include <set>
#include <stdexcept>
#include <string>
#include <type_traits>

namespace VaangoUI 
{

class Vaango_SettingsParser
{
public:

  Vaango_SettingsParser(const std::string filename)
  {
    d_error = ini_parse(filename.c_str(), valueHandler, this);
    if (d_error != 0) {
      // Returns 0 on success, line number of first error on parse error (doesn't
      // stop on first error), -1 on file open error, or -2 on memory allocation
      // error (only when INI_USE_STACK is zero).
      if (d_error == -1) {
        throw std::runtime_error("Vaango_SettingsParser:: Could not open file " + filename);
      } else if (d_error == -2) {
        throw std::runtime_error("Vaango_SettingsParser:: Memory allocation error during parsing");
      } else {
        throw std::runtime_error("Vaango_SettingsParser:: Parse error in file " + filename + " line : " + std::to_string(d_error));
      }
    }
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, std::string>::value, bool> = true>
  void set(const std::string& section,
           const std::string& name,
           const T& value)
  {
    auto key = makeKey(section, name);
    d_values[key] = value;
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, int>::value, bool> = true>
  void set(const std::string& section,
           const std::string& name,
           const T& value)
  {
    auto key = makeKey(section, name);
    d_values[key] = std::to_string(value);
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, double>::value, bool> = true>
  void set(const std::string& section,
           const std::string& name,
           const T& value)
  {
    auto key = makeKey(section, name);
    d_values[key] = std::to_string(value);
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, bool>::value, bool> = true>
  void set(const std::string& section,
           const std::string& name,
           const T& value)
  {
    auto key = makeKey(section, name);
    d_values[key] = value ? "true" : "false";
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, std::string>::value, bool> = true>
  T get(const std::string& section,
        const std::string& name,
        const T& default_value)
  {
    auto key = makeKey(section, name);
    return d_values.count(key) ? d_values.at(key) : default_value;
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, long>::value, bool> = true>
  T get(const std::string& section,
        const std::string& name,
        const T& default_value)
  {
    std::string valstr = get<std::string>(section, name, ""); 
    if (!valstr.size()) {
      throw std::runtime_error("Vaango_SettingsParser:" + section + " or " + name + " not found in settings file");
    }
    return std::stol(valstr, nullptr, 0);
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, double>::value, bool> = true>
  T get(const std::string& section,
        const std::string& name,
        const T& default_value)
  {
    std::string valstr = get<std::string>(section, name, ""); 
    if (!valstr.size()) {
      throw std::runtime_error("Vaango_SettingsParser:" + section + " or " + name + " not found in settings file");
    }
    return std::stod(valstr, nullptr);
  }

  template <typename T,
            std::enable_if_t<std::is_same<T, bool>::value, bool> = true>
  T get(const std::string& section,
        const std::string& name,
        const T& default_value)
  {
    std::string valstr = get<std::string>(section, name, ""); 
    if (!valstr.size()) {
      throw std::runtime_error("Vaango_SettingsParser:" + section + " or " + name + " not found in settings file");
    }
    std::transform(valstr.begin(), valstr.end(), valstr.begin(), ::tolower);
    if (valstr == "true" || valstr == "yes" || valstr == "on" || valstr == "1")
      return true;
    else if (valstr == "false" || valstr == "no" || valstr == "off" || valstr == "0")
      return false;
    else
      return default_value;
  }

  void dump(const std::string& filename) 
  {
    std::set<std::string> sections;
    for (const auto& item : d_values) {
      sections.insert(item.first.first);
    }

    std::ofstream outfile(filename);
    for (const auto& section: sections) {
      if (!section.empty()) {
        outfile << "[" << section << "]\n";
      }
      for (const auto& item : d_values) {
        if (section == item.first.first) {
          outfile << item.first.second << " = " << item.second << "\n";
        }
      }
    }
    outfile.close();
  }

private:

  int d_error;
  std::map<std::pair<std::string, std::string>, std::string> d_values;

private:

  static std::pair<std::string, std::string> makeKey(const std::string& section,
                                                     const std::string& name)
  {
    auto key = std::make_pair(section, name);
    std::transform(key.first.begin(), key.first.end(), key.first.begin(), ::tolower);
    std::transform(key.second.begin(), key.second.end(), key.second.begin(), ::tolower);
    return key;
  }

  static int valueHandler(void* user,
                          const char* section,
                          const char* name,
                          const char* value)
  {
    Vaango_SettingsParser* reader = (Vaango_SettingsParser*) user;
    auto key = makeKey(section, name);
    if (reader->d_values[key].size() > 0) {
      reader->d_values[key] += "\n";
    }
    reader->d_values[key] += value;
    return 1;
  }
};

} // namespace VaangoUI

#endif // __Vaango_SETTINGS_PARSER_H__