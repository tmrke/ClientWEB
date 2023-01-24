new Vue({
    el: "#app",

    data: {
        items: [],
        newItemText: "",
        itemId: 1,
        isNewItemInvalid: false
    },

    methods: {
        addItem: function () {
            this.isNewItemInvalid = this.newItemText.length === 0;

            if (this.isNewItemInvalid) {
                return;
            }

            this.items.push({
                id: this.itemId,
                text: this.newItemText,
                isEditMode: false,
                editText: "",
                isInvalid: false
            });

            this.itemId++;
            this.newItemText = "";
        },

        deleteItem: function (itemIndex) {
            this.items.splice(itemIndex, 1);
        },

        editItem: function (item) {
            item.editText = item.text;
            item.isEditMode = true;
        },

        save: function (item) {
            item.isInvalid = item.editText.length === 0;

            if (item.isInvalid) {
                return;
            }

            item.text = item.editText;
            item.isEditMode = false;
        },

        cancelEdit: function (item) {
            item.isEditMode = false;
        }
    }
});