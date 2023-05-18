import { Router } from 'express';

// Controllers
import { getUsersShort, insertUser } from '@/api/controllers/usersController';

const usersRouter = Router();

usersRouter.post('/users', insertUser);
usersRouter.get('/users/short', getUsersShort);

// usersRouter.get('/users/:id', (req: Request, res: Response) => {
//   const id: number = +req.params.id
//   res.send(`Get the user: ${id}`)
// });

// usersRouter.put('/users/:id', (req: Request, res: Response) => {
//   const id: number = +req.params.id
//   res.send(`Update the user ${id}`)
// });

// usersRouter.delete('/users/:id', (req: Request, res: Response) => {
//   const id: number = +req.params.id
//   res.send(`Delete the user ${id}`)
// });

export default usersRouter;