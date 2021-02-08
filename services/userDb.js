import user from './user'

import { scope } from './gun'

const userDb = user.get(scope)

export default userDb
