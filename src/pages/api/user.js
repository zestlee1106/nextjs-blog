import { userDetail } from 'constants/useDetail'

export default function handler(req, res) {
  res.status(200).json(userDetail)
}
