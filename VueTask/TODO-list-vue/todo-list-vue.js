Vue.component("note", {
    props: ["note"],
    template: "#note-template",
    data: function () {
        return {
            isEditMode: false
        }
    },
    methods: {
        deleteNote: function () {
            this.$emit("delete-note", this.note);
        },

        editNote: function () {
            this.isEditMode = true;
        }
    }
});

new Vue({
    el: "#app",
    data: {
        isEditMode: false,
        newNoteText: "",
        changedText: "",
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

        saveChange: function () {
            if (this.changedText.trim().length === 0) {
                return;
            }


        },

        cancelChange: function () {

        }
    }
});