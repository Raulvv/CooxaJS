# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

question = Question.create([
	{
		question: 'How to make a search loop with a while?',
		question_code: "var arr = [2, 'comeOn', true, 29, 6, 'only', 'great'];",
		explanation: "You have to look for the position of the element 'great' on the next array.",
		final_result: '6', 
	},
	{
		question: 'How to make a Fibonacci serial?',
		question_code: "var num1 = 0;\n var num2 = 1;\n var fibonacci = ''",
		explanation: "The Fibonacci serial is created by adding the value of the two last numbers.",
		final_result: '1 1 2 3 5 8 13 21 34 55', 
	}
	])

rule = Rule.create([
	{
		expression: 'var\s?\w+\s?[=]\s?\d[;]',
		tip: 'Maybe you should create a count variable',
		question_id: 1
	},
	{
		expression: 'var\s?\w+\s?[=]\s?(false|true)',
		tip: 'Maybe you should create a boolean variable',
		question_id: 1
	},
	{
		expression: 'while[(].+[)]',
		tip: 'Maybe you should create a while loop ¡Remember to not create a infinite loop!',
		mandatory: true,
		hint: 'If you use the for loop or the do while loop, its not the better choice. This is because you may don´t need to execute code and with this two loops, you´re doing it.',
		question_id: 1
	},
	{
		expression: 'if',
		tip: 'Maybe you should create a conditional',
		question_id: 1
	},
	{
		expression: '\w+\s?[=]\s?true[;]',
		tip: 'Maybe you have to change the value of the boolean',
		question_id: 1
	},
	{
		expression: '(while|do.+while|for)',
		tip: 'Maybe you should create a loop.',
		question_id: 2
	},
	{
		expression: '[{]/s+[}]',
		tip: 'The Fibonacci Serial is make by 3 simple operations, an exchange of values between numbers.',
		question_id: 2
	},
	{
		expression: 'num2/s?[=]/s?num1',
		tip: 'The second number has to be like the first one once the actual number is added',
		question_id: 2
	},
	{
		expression: 'var/s/w+',
		tip: 'Maybe you have to add an additional variable. Search about the buble exchange.',
		question_id: 2
	}
	])