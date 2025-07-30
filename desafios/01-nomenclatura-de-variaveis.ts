// Nomenclatura de variáveis

const list = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUser(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const user = await response.json()
  const orderList = list.sort((ascendent, decrescent) =>  {
    return ascendent.followers - decrescent.followers
  }); 

  const category = orderList.find(order => user.followers > order.followers)

  const result = {
    username,
    category: category.title
  }

  return result
}

getUser({ query: {
  username: 'josepholiveira'
}}, {})
