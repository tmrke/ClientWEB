Vue.component("list-item", {
    props: ["note"],
    template: "#list-item-template",
    data: function () {
        return {
            isEditMode: false,
            beforeChangeNote: this.note
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
            if(this.note)

            this.$emit("save-change", this.beforeChangeNote, this.note);
            this.isEditMode = false;
        },

        cancelChange: function () {
            this.$emit("cancel-change", this.beforeChangeNote);
            this.isEditMode = false;
        }
    }
});

new Vue({
    el: "#app",
    data: {
        newNoteText: "",
        notes: []
    },
    methods: {
        addNote: function () {
            if (this.newNoteText.length === 0) {
                return;
            }

            this.notes.push(this.newNoteText);
            this.newNoteText = "";
        },

        deleteNote: function (note) {
            this.notes = this.notes.filter(function (currentNote) {
                return note !== currentNote;
            });
        },

        saveChange: function (beforeChangeNote, note) {

        },

        cancelChange: function () {
        }
    }
});