import config from "./config";

export default {
    getValues: async () =>
        await fetch(config.itemsPeriods, {})
            .then((res) => res.json())
            .then((items) =>
                items
            ),
    getInfo: async (id) =>
        await fetch(config.itemsPeriods + "info" + "?id=" + id)
            .then((res) => res.json())
            .then((items) =>
                items
            ),
}