# Diff Default

Diff the current opened file with the default

with shorcut `"f7"`

(by some rules)

## rules

setting the default diff file of `file1.txt` to `file2.txt`

```json5
{
    "diffdefault.rules": [
        // in user settings
        ["absolute_path/file1.txt", "absolute_path/file2.txt"],
        // or in workspace settings
        ["relative_path/file1.txt", "absolute_path/file2.txt"],
        ["relative_path/file1.txt", "relative_path/file2.txt"],
    ]
}
```

setting the default diff file of `project1/file.txt` to `project2/file.txt`


```json5
{
    "diffdefault.rules": [
        // in user settings
        ["absolute_path/project1", "absolute_path/project2"],
        // or in workspace settings
        ["relative_path/project1", "absolute_path/project2"],
        ["relative_path/project1", "relative_path/project2"],
    ]
}
```



## example

there are two folders where we need to diff the files one by one

```txt
.
├── project1
│   └── src
│       └── file.txt
└── project2
    └── src
        └── file.txt
```

in `project1`, put the following json in file `.vscode/settings.json`

```json
{
    "diffdefault.rules": [
        [".", "../project2"]
    ]
}
```

now, open `project1` as a workspace, and open the file `src/file.txt`, run `diffdefault`
in the command palette (`f1` or `ctrl`+ `P`).

![example](https://raw.githubusercontent.com/zyctree/vscode-diff-default/master/example/example.gif "example")

