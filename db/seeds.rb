# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

question = Question.create([
	{
		question: 'How to make a search loop?',
		question_code: "var arr = [2, 'comeOn', true, 29, 6, 'only', 'great'];",
		explanation: "You have to look for the position of the element 'great' on the next array.",
		final_result: '6', 
	},
	{
		question: 'How to make a Fibonacci serial?',
		question_code: "var arr = [2, 'comeOn', true, 29, 6, 'only', 'great'];",
		explanation: "You have to look for the position of the element 'great' on the next array.",
		final_result: '1 1 2 3 5 8 13 21 34 55', 
	}
	])

rule = Rule.create([
	{
		expression: 'var\s?\w+\s?[=]\s?\d[;]',
		tip: 'Maybe you sould create a count variable',
		question_id: 1
	},
	{
		expression: 'var\s?\w+\s?[=]\s?(false|true)',
		tip: 'Maybe you sould create a boolean variable',
		question_id: 1
	},
	{
		expression: 'while[(].+[)]',
		tip: 'Maybe you sould create a while loop ¡Remember to not create a infinite loop!',
		question_id: 1
	},
	{
		expression: 'if',
		tip: 'Maybe you sould create a conditional',
		question_id: 1
	},
	{
		expression: '\w+\s?[=]\s?true[;]',
		tip: 'Maybe you have to change the value of the boolean',
		question_id: 1
	}
	])