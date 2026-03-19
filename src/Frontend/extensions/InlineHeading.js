import { Mark, mergeAttributes } from "@tiptap/core";

const InlineHeading = Mark.create({
  name: "inlineHeading",

  addAttributes() {
    return {
      level: {
        default: 1,
        parseHTML: (element) => Number(element.getAttribute("data-level") || 1),
        renderHTML: ({ level }) => ({
          "data-level": level,
          class: `inline-heading inline-heading-${level}`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-inline-heading]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        {
          "data-inline-heading": "true",
        },
        HTMLAttributes
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setInlineHeading:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },

      toggleInlineHeading:
        (attributes) =>
        ({ editor, commands }) => {
          if (editor.isActive(this.name, attributes)) {
            return commands.unsetMark(this.name);
          }

          return commands.unsetMark(this.name) && commands.setMark(this.name, attributes);
        },

      unsetInlineHeading:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default InlineHeading;
