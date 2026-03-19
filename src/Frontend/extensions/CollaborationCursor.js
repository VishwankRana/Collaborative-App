import { Extension } from "@tiptap/core";
import { defaultSelectionBuilder, yCursorPlugin } from "@tiptap/y-tiptap";

const defaultOnUpdate = () => null;

function awarenessStatesToArray(states) {
  return Array.from(states.entries()).map(([clientId, value]) => {
    return {
      clientId,
      ...value.user,
    };
  });
}

const CollaborationCursor = Extension.create({
  name: "collaborationCursor",

  addOptions() {
    return {
      provider: null,
      user: {
        name: null,
        color: null,
      },
      render: (user) => {
        const cursor = document.createElement("span");
        cursor.classList.add("collaboration-cursor__caret");
        cursor.setAttribute("style", `border-color: ${user.color}`);

        const badge = document.createElement("div");
        badge.classList.add("collaboration-cursor__badge");
        badge.setAttribute("style", `background-color: ${user.color}`);

        const pulse = document.createElement("span");
        pulse.classList.add("collaboration-cursor__pulse");
        badge.insertBefore(pulse, null);

        const label = document.createElement("div");
        label.classList.add("collaboration-cursor__label");
        label.setAttribute("style", `background-color: ${user.color}`);
        label.insertBefore(document.createTextNode(user.name), null);

        badge.insertBefore(label, null);
        cursor.insertBefore(badge, null);

        return cursor;
      },
      selectionRender: defaultSelectionBuilder,
      onUpdate: defaultOnUpdate,
    };
  },

  addStorage() {
    return {
      users: [],
    };
  },

  addCommands() {
    return {
      updateUser:
        (attributes) =>
        () => {
          this.options.user = attributes;
          this.options.provider.awareness.setLocalStateField(
            "user",
            this.options.user
          );

          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      yCursorPlugin(this.options.provider.awareness, {
        cursorBuilder: this.options.render,
        selectionBuilder: this.options.selectionRender,
      }),
    ];
  },

  onCreate() {
    this.options.provider.awareness.setLocalStateField("user", this.options.user);
    this.storage.users = awarenessStatesToArray(
      this.options.provider.awareness.states
    );

    this.options.provider.awareness.on("update", () => {
      this.storage.users = awarenessStatesToArray(
        this.options.provider.awareness.states
      );
    });
  },
});

export default CollaborationCursor;
