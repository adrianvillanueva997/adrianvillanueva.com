---
title: "Running Rust on Python"
date: 2022-12-28
draft: false
description: "Creating a simple library in Rust with a Python interface"
tags: ["rust", "python", "software"]
categories: ["programming", "rust", "python"]

lightgallery: true
---

## Intro

Everyone is super excited about rust and its starting to get a lot of attention from everyone due to different reasons such as is strong type checking, performance among others.

There is also a couple of rust libraries with interfaces in Python like [polars](https://www.pola.rs/).

## Installing and using maturin

{{< admonition >}}
I assume that you have already installed Rust and Cargo in your system, if you do not have it feel free to download it from [rustup](https://rustup.rs/)

Regarding Python feel free to use any dependencies management tool that you like, either pip or poetry can be used.
{{< /admonition >}}

Maturin is a library that allows us to compile rust binaries into python packages, to install it run:

```bash
pip install maturin

poetry add maturin
```

Whenever maturin is installed you can create a new project by running the following command:

```bash
maturin new rustypython
```

This is the folder structure that we are going to get after creating the maturin project:

```txt
Parent folder
│   README.md
│   file001.txt
│
└─── .github
│   │   CI.yml
│   │   file012.txt
│
└───rustypython
│       │   __init__.py
│       │   main.py
│       │   ...
│
└───src
    │   lib.rs
```

Let's create a very simple function that prints ```hello from rust```:

Simply add the following code to ```src/lib.rs```:

```rust
use pyo3::prelude::*;


#[pyfunction]
/// This is an example hello world function in rust
fn hello_world() {
    println!("Hello world!")
}

```

Afterwards, we need to add the function to the rustypython python package:

```rust
/// A Python module implemented in Rust.
#[pymodule]
fn rustypython(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(hello_world, m)?)?;
    Ok(())
}
```

At the end  ```lib.rs``` should look like this:

```rust
use pyo3::prelude::*;


#[pyfunction]
/// This is an example hello world function in rust
fn hello_world() {
    println!("Hello world!")
}

/// A Python module implemented in Rust.
#[pymodule]
fn rustypython(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(hello_world, m)?)?;
    Ok(())
}

```

To compile and install the rust library into your python environment run:

```bash
maturin develop
```

The last step is creating the python package locally. Create a folder inside your project called rustypython, inside it initialize a ```__init__.py``` file with the following imports:

```python
from .rustypython import hello_world
```

Later on in another python file with the name of your choice, add the following code:

```python
import rustypython
from rustypython import hello_world

print(rustypython.__doc__)

hello_world()
```

If you run this code you should be able to see the message that you put in the print in rust.

You can always clone this example from my [repository](https://github.com/adrianvillanueva997/rusty-python)
