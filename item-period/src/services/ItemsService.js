import config from "./config";

export default {
    getItems: async () =>
        await fetch(config.items, {})
            .then((res) => res.json())
            .then((items) =>
                items
            ),
    addItem: async (name, description) => {
        await fetch(config.items, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "description": description })
        }).then((res) => res.text())
            .then((status) =>
                status
            )
    },
    deleteItem: async (id) => {
        await fetch(config.items, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": id })
        }).then((res) => res.text())
            .then((status) =>
                status
            )
    },
    updateItem: async(item)=>{

        await fetch(config.items, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": item.id,"name": item.name, "description":item.description })
        }).then((res) => res.text())
            .then((status) =>
                status
            )
    }
}