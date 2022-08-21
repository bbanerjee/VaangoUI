#include <Vaango_SettingsParser.h>
#include <gtest/gtest.h>
#include <iostream>

/*
TEST(parserTest, BasicAssertions) {
  // Expect two strings not to be equal.
  EXPECT_STRNE("hello", "world");
  // Expect equality.
  EXPECT_EQ(7 * 6, 42);
}
*/

TEST(parserTest, getData) {
  try {
    VaangoUI::Vaango_SettingsParser parser("settings.ini");

    // get string
    std::string str = parser.get<std::string>("files", "last_imported_model", "test_string");
    std::cout << "string 1 : " << str << "\n";

    // get integer
    long lval = parser.get<long>("layout.dock4", "child0", 123);
    std::cout << "long 1 : " << lval << "\n";

    lval = parser.get<long>("test_section", "hexint", 123);
    std::cout << "long 2 : " << lval << "\n";

    // get double
    double dval = parser.get<double>("layout.dock1", "x", 3.45);
    std::cout << "double : " << dval << "\n";

    // get bool
    bool bval = parser.get<bool>("test_section", "opened", true);
    std::cout << "bool : " << std::boolalpha << bval << "\n";

  } catch (std::runtime_error err) {
    std::cout << "**ERROR**" << err.what() << "\n";
  }
}

TEST(parserTest, setData) {
  try {
    VaangoUI::Vaango_SettingsParser parser("settings.ini");

    // set string
    parser.set<std::string>("test_section", "test_name", "test_string");

    // set integer
    parser.set<int>("test_section", "test_name1", 123);

    // set integer
    parser.set<double>("test_section", "test_name2", 3.45);

    // set bool
    parser.set<bool>("test_section", "test_name3", true);

  } catch (std::runtime_error err) {
    std::cout << "**ERROR**" << err.what() << "\n";
  }
}

TEST(parserTest, writeToFile) {
  
  try {
    VaangoUI::Vaango_SettingsParser parser("settings.ini");

    // set string
    parser.set<std::string>("test_section", "test_name", "test_string");

    // set integer
    parser.set<int>("test_section", "test_name1", 123);

    // set integer
    parser.set<double>("test_section", "test_name2", 3.45);

    // set bool
    parser.set<bool>("test_section", "test_name3", true);

    // dump to file
    parser.dump("testsettings.ini");

  } catch (std::runtime_error err) {
    std::cout << "**ERROR**" << err.what() << "\n";
  }
}
