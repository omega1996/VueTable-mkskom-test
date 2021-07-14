import config from "./config";

export default {
    getItems: async () =>
        await fetch(config.periods, {})
            .then((res) => res.json())
            .then((items) =>
                items
            ),
    addItem: async (name, description) => {
        await fetch(config.periods, {
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
        await fetch(config.periods, {
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

        await fetch(config.periods, {
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