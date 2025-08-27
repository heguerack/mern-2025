import { Router } from 'express'
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middleware/middewareValidations/validateUpdateUserInput.js'
import {
  authorizePermissionsMiddleware,
  checkForTestuser,
} from '../middleware/authMiddleware.js'
import { upload } from '../middleware/multerMiddleware.js'

const router = Router()

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissionsMiddleware('admin'),
  getApplicationStats
)
router.patch(
  '/update-user',
  checkForTestuser,
  //remeber, the 'avatar' name was given in the profile action on the fornt end
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
