Vue.component("note", {
    props: ["note"],
    template: "#note-template",
    data: function () {
        return {
            isEditMode: false,
            beforeChangeNoteText: this.newNoteText
        }
    },
    methods: {
        deleteNote: function () {
            this.$emit("delete-note", this.note);
        },

        editNote: function () {
            this.isEditMode = true;
        },

        saveChange: function () {
            this.$emit("save-change", this.beforeChangeNoteText, this.note)
        },

        cancelChange: function () {
            this.isEditMode = false;
        }
    }
});

new Vue({
    el: "#app",
    data: {
        isEditMode: false,
        newNoteText: "",
        notes: []
    },
    methods: {
        addNote: function () {
            if (this.newNoteText.trim().length === 0) {
                return;
            }

            this.notes.push(this.newNoteText);
            this.newNoteText = "";
        },

        editNote: function () {
            this.isEditMode = true;
        },

        deleteNote: function (note) {
            this.notes = this.notes.filter(function (currentNote) {
                return note !== currentNote;
            });
        },

        saveChange: function (beforeChangeNoteText, note) {     //тут разрулить че где. не работает
            if (note.trim().length === 0) {
                this.newNoteText = beforeChangeNoteText;
            } else {
                this.beforeChangeNoteText = this.newNoteText;
            }

            this.isEditMode = false;
        },

        cancelChange: function () {
            this.isEditMode = false;
        }
    }
});