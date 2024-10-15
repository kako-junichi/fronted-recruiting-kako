import { z } from 'zod';
import { formDataSchema } from '../constants/form';

export type FormData = z.infer<typeof formDataSchema>;
