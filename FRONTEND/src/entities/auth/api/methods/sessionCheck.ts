export const sessionCheck = async (reqt) => {
    const data = await fetch('/api/user/session/check', {
        body: JSON.stringify(reqt),
        method: 'POST',
    })
    console.log('data', data)
    return await data.json()
}