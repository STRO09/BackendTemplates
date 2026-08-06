import ApiError from "../utils/ApiError.js";

export default function validate(schema) {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            const errors = result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }));

            return next(
                new ApiError({
                    statusCode: 400,
                    message: "Validation failed.",
                    errors
                })
            );
        }

        req.body = result.data;

        next();

    };

}