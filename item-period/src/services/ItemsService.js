import config from "./config";

export default {
    getItems: async () =>
        await fetch(config.host+'items', {})
            .then((res) => res.json())
            .then((items) =>
                items
            )

}