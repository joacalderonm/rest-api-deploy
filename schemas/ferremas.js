const z = require('zod')

const ferremasSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'No es un nombre',
        required_error: 'Nombre es requerido.'
    }),
    descripcion: z.string().nullable()
})

function validateFerremas (object) {
    return ferremasSchema.safeParse(object)
}

function validatePartialFerremas(object){
    return ferremasSchema.partial().safeParse(object)
}


module.exports = {
    validateFerremas,
    validatePartialFerremas
}