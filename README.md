# mdx-hast-reduction

mdx-hast-reduction is a plugin for [mdx-js/mdx](https://github.com/mdx-js/mdx)
to perform reduction on the MDX HAST tree.

> **WARNING** This plugin uses [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
> for reduction.
> Normally, you don't want unknown users to write MDX documents freely for
> security reasons. But if you do, please sanitize user inputs, no matter you
> decide to use this plugin or not.

MDX is a useful project to use JSX in markdown documents and transform them
into React components. However, because the way it transpile the
documents, the output files often come with a bloated size. MDX treats React
components and HTML tags the same, and generate `React.createElement` call for
each element it receives. Since markdown-formatted documents will always be
rendered to static HTML code, we can safely use `dangerouslySetInnerHTML` to
reduce the number of elements for outputs.

## Usage

Put this plugin in the `hastPlugins` array.
See [MDX documentation](https://mdxjs.com/plugins). Or you can check out the
`webpack.modules.config.js` in the `example` folder.

## Benchmark

A possible better benchmark would be to collect a sufficient amount of MDX
documents for this test. Here we only use the `READMD.md` for the MDX project,
which you can found [here](https://github.com/mdx-js/mdx/blob/master/readme.md).
We create a test page which only include the markdown file, and compare the
output bundle size w/o this plugin enabled. The sample project can be found in
the `example` folder.

```
# With this plugin:

$ tree dist -s
dist
├── [        370]  index.html
├── [       8541]  main.8ef1c82d1037b7e85e52.js
├── [        128]  main.8ef1c82d1037b7e85e52.js.map
├── [       4096]  vendors
├── [     119357]  vendors.b8641733886540194745.js
└── [        446]  vendors.b8641733886540194745.js.map

# Without this plugin:

$ tree dist -s
dist
├── [        370]  index.html
├── [      11656]  main.954bf1d244f45d843edf.js
├── [        128]  main.954bf1d244f45d843edf.js.map
├── [       4096]  vendors
├── [     119357]  vendors.b8641733886540194745.js
└── [        446]  vendors.b8641733886540194745.js.map

```

Note that these numbers may vary by webpack or MDX versions.

## TODO

- [ ] Respect options (especially the `components` prop)
- [ ] More aggressive reduction on the root node.
