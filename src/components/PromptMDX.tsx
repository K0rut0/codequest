import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

interface Props {
  props: {
    markdown: string;
  };
}

const options = {
  theme: "material-theme-darker",
};

const PreBlock = ({ node, children, ...props }) => {
  return (
    <pre className="rounded p-2" {...props}>
      {children}
    </pre>
  );
};

const components = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h1 className="text-2xl">{children}</h1>,
  p: ({ children }) => <p className="text-md py-3">{children}</p>,
  pre: PreBlock,
};

export default function PromptMDX({ props }: Props) {
  return (
    <div className="flex flex-col">
      <MDXRemote
        source={props.markdown}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [[rehypePrettyCode, options]],
          },
        }}
      />
    </div>
  );
}
