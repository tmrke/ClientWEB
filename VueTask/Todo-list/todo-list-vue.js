new Vue({
    el: "#app",

    data: {
        items: [],
        newItemText: "",
        itemId: 1,
        isNewItemInvalid: false,
        isShowError: false
    },

    methods: {
        addItems: function () {
            if (this.newItemText.length === 0) {
                this.isShowError = true;

                return;
            }

            this.items.push({
                id: this.itemId,
                text: this.newItemText,
                isEditMode: false,
                editText: ""
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

        saveChange: function (item) {
            if (item.editText.length === 0) {
                this.isShowError = true;

                return;
            }

            item.text = item.editText;
            item.isEditMode = false;
        },

        cancelChange: function (item) {
            item.isEditMode = false;
        },

        hideError: function () {
            this.isShowError = false;
        }
    }
});