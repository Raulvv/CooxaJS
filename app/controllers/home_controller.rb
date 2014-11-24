class HomeController < ApplicationController
	def index
		@question = Question.find(1)
		render 'index'
	end

	def event
		if request.xhr?
			@tips = Question.find(1).rules
			render json: @tips
		else
			render "error"
		end
	end
end
