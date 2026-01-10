Building the optional nanobind C++ extension

This project includes an optional C++ extension using nanobind to speed up point-in-mesh checks.

Prerequisites:
- A C++17 compatible compiler (gcc/clang)
- Python headers and a working `python3` development environment
- `nanobind` headers available. Either:
  - Install a Python package that provides `nanobind` headers, or
  - Clone nanobind headers and set environment variable `NANOBIND_INCLUDE` to the include path.

Example build (from repository root):

```bash
# Option A: if you have nanobind headers installed and available via NANOBIND_INCLUDE
export NANOBIND_INCLUDE=/path/to/nanobind/include
python3 setup.py build_ext --inplace

# Option B: If you installed a Python package that exposes nanobind headers
python3 setup.py build_ext --inplace
```

If build succeeds the extension will be available as `vaango_ui.geomutils._points_cpp` and
`create_points_random.py` will automatically use it.

If you can't or don't want to build the extension the pure-Python fallback remains available.
