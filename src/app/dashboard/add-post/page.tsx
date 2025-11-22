export default function Page() {
  return (
    <>
      <>
        <h1 className="PlaygroundEditorTheme__h1">
          <span style={{ whiteSpace: "pre-wrap" }}>
            Welcome to the playground
          </span>
        </h1>
        <blockquote className="PlaygroundEditorTheme__quote">
          <span style={{ whiteSpace: "pre-wrap" }}>
            In case you were wondering what the black box at the bottom is –
            it's the debug view, showing the current state of the editor. You
            can disable it by pressing on the settings control in the
            bottom-left of your screen and toggling the debug view setting.
          </span>
        </blockquote>
        <p className="PlaygroundEditorTheme__paragraph">
          <span style={{ whiteSpace: "pre-wrap" }}>
            The playground is a demo environment built with{" "}
          </span>
          <code spellCheck="false" style={{ whiteSpace: "pre-wrap" }}>
            <span className="PlaygroundEditorTheme__textCode">
              @lexical/react
            </span>
          </code>
          <span style={{ whiteSpace: "pre-wrap" }}>. Try typing in </span>
          <b>
            <strong
              className="PlaygroundEditorTheme__textBold"
              style={{ whiteSpace: "pre-wrap" }}
            >
              some text
            </strong>
          </b>
          <span style={{ whiteSpace: "pre-wrap" }}> with </span>
          <i>
            <em
              className="PlaygroundEditorTheme__textItalic"
              style={{ whiteSpace: "pre-wrap" }}
            >
              different
            </em>
          </i>
          <span style={{ whiteSpace: "pre-wrap" }}> formats.</span>
        </p>
        <p className="PlaygroundEditorTheme__paragraph">
          <span style={{ whiteSpace: "pre-wrap" }}>
            Make sure to check out the various plugins in the toolbar. You can
            also use{" "}
          </span>
          <span
            className="PlaygroundEditorTheme__hashtag"
            style={{ whiteSpace: "pre-wrap" }}
          >
            #hashtags
          </span>
          <span style={{ whiteSpace: "pre-wrap" }}> or @-mentions too!</span>
        </p>
        <p className="PlaygroundEditorTheme__paragraph">
          <span style={{ whiteSpace: "pre-wrap" }}>
            If you'd like to find out more about Lexical, you can:
          </span>
        </p>
        <ul className="PlaygroundEditorTheme__ul">
          <li value={1} className="PlaygroundEditorTheme__listItem">
            <span style={{ whiteSpace: "pre-wrap" }}>Visit the </span>
            <a
              href="https://lexical.dev/"
              className="PlaygroundEditorTheme__link"
            >
              <span style={{ whiteSpace: "pre-wrap" }}>Lexical website</span>
            </a>
            <span style={{ whiteSpace: "pre-wrap" }}>
              {" "}
              for documentation and more information.
            </span>
          </li>
          <li value={2} className="PlaygroundEditorTheme__listItem">
            <span style={{ whiteSpace: "pre-wrap" }}>
              Check out the code on our{" "}
            </span>
            <a
              href="https://github.com/facebook/lexical"
              className="PlaygroundEditorTheme__link"
            >
              <span style={{ whiteSpace: "pre-wrap" }}>GitHub repository</span>
            </a>
            <span style={{ whiteSpace: "pre-wrap" }}>.</span>
          </li>
          <li value={3} className="PlaygroundEditorTheme__listItem">
            <span style={{ whiteSpace: "pre-wrap" }}>
              Playground code can be found{" "}
            </span>
            <a
              href="https://github.com/facebook/lexical/tree/main/packages/lexical-playground"
              className="PlaygroundEditorTheme__link"
            >
              <span style={{ whiteSpace: "pre-wrap" }}>here</span>
            </a>
            <span style={{ whiteSpace: "pre-wrap" }}>.</span>
          </li>
          <li value={4} className="PlaygroundEditorTheme__listItem">
            <span style={{ whiteSpace: "pre-wrap" }}>Join our </span>
            <a
              href="https://discord.com/invite/KmG4wQnnD9"
              className="PlaygroundEditorTheme__link"
            >
              <span style={{ whiteSpace: "pre-wrap" }}>Discord Server</span>
            </a>
            <span style={{ whiteSpace: "pre-wrap" }}>
              {" "}
              and chat with the team.
            </span>
          </li>
        </ul>
        <p className="PlaygroundEditorTheme__paragraph">
          <span style={{ whiteSpace: "pre-wrap" }}>
            Lastly, we're constantly adding cool new features to this
            playground. So make sure you check back here when you next get a
            chance{" "}
          </span>
          <span className="emoji happysmile" style={{ whiteSpace: "pre-wrap" }}>
            <span className="emoji-inner">🙂</span>
          </span>
          <span style={{ whiteSpace: "pre-wrap" }}>.</span>
        </p>
      </>
    </>
  );
}
