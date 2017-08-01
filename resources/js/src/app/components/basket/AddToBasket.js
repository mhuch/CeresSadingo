const ResourceService = require("services/ResourceService");

Vue.component("add-to-basket", {

    props: [
        "item",
        "itemUrl",
        "showQuantity",
        "template",
        "salable",
        "useLargeScale",
        "showOrderProperties"
    ],

    data()
    {
        return {
            quantity: 1,
            buttonLockState: false
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.useLargeScale = this.useLargeScale || false;
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket()
        {
            const basketObject =
                {
                    variationId             :   this.variationId,
                    quantity                :   this.quantity,
                    basketItemOrderParams   :   this.item.properties
                };

            ResourceService
                .getResource("basketItems")
                .push(basketObject);

            this.openAddToBasketOverlay();
        },

        directToItem()
        {
            window.location.assign(this.itemUrl);
        },

        handleButtonState(value)
        {
            this.buttonLockState = value;
        },

        /**
         * open the AddItemToBasketOverlay
         */
        openAddToBasketOverlay()
        {
            const currentBasketObject =
                {
                    currentBasketItem: this.item,
                    quantity         : this.quantity
                };

            ResourceService
                .getResource("basketItem")
                .set(currentBasketObject);
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity(value)
        {
            this.quantity = value;
        }
    },

    computed:
    {
        /**
         * returns item.variation.id
         */
        variationId()
        {
            return this.item.variation.id;
        },

        hasChildren()
        {
            return this.item.filter && this.item.filter.hasChildren && App.isCategoryView;
        }
    }
});
