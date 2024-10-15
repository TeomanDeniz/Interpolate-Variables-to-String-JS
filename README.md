# Interpolate Variables to String

This function allows you to dynamically interpolate variables into strings in a flexible way. It can replace both basic placeholders like `${VARIABLE}` for single variables or object properties, and more complex structures like `$[ARRAY]{@.PROPERTY}`, which iterate over arrays and inject values using a template syntax.

## How to Use

### Basic Syntax

The function replaces placeholders inside a string using the corresponding values from a provided object.

* Basic Variable Replacement:
```js
var string = "Hello ${name}!";
var object = { name: "John" };
INTERPOLATE_VARIABLES_TO_STRING(string, object); 
// Output: "Hello John!"
```

* Nested Property Replacement:
```js
var string = "User: ${user.name}, Age: ${user.age}";
var object = { user: { name: "Alice", age: 30 } };
INTERPOLATE_VARIABLES_TO_STRING(string, object);
// Output: "User: Alice, Age: 30"
```

### Array Iteration with Templates

You can iterate through arrays and use a custom template for each item. The syntax `$[ARRAY]{@.PROPERTY}` is used to define the array and properties inside the template.

```js
var string = "Items: $[items]{<div>@.name - @.price</div>}";
var object = {
	items: [
		{
			name: "Item 1",
			price: "$10"
		},
		{
			name: "Item 2",
			price: "$20"
		}
	]
};

INTERPOLATE_VARIABLES_TO_STRING(string, object);
// Output: "Items: <div>Item 1 - $10</div><div>Item 2 - $20</div>"
```

## License

This project is licensed under the **MIT License**.

Let me know if you'd like to add or modify anything!
