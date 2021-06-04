# jupyterlab-extensions

## Installation steps

```bash
# clone the repository
git clone https://github.com/kbindra/jupyterlab-extensions.git

# go to the extension examples folder
cd jupyterlab-extensions

# create a new environment
conda env create

# activate the environment
conda activate venv

# go to the hello world example
cd my_second_extension

# install the extension in editable mode
python -m pip install -e .

# install your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# build the TypeScript source after making changes
jlpm run build

# start JupyterLab
jupyter lab
```
