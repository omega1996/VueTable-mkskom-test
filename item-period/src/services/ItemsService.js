import config from "./config";

export default {
    getItems: async () =>
        await fetch(config.items, {})
            .then((res) => res.json())
            .then((items) =>
                items
            ),
    addItem: async (name, description) =>
        await fetch(config.items, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "description": description })
        }).then((res) => res.text())
            .then((status) =>
                status
            ),
    deleteItem: async () => { },
    deleteItems: async () => { }
}