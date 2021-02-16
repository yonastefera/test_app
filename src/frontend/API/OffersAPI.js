export const offersAPI = {
    async getOffers() {
        return await fetch("/api/get/objects", {method: "GET"});
    }
}
