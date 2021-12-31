class Cities {
    async get(city = '') {
        const cities = await fetch(decodeURI('/cities?search=' + city) )

        return await cities.json()
    }
}
export default new Cities()