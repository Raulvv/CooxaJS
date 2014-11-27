class HomeController < ApplicationController
	def index
		if params[:id]
			@question = Question.find(params[:id])
		else
			@question = Question.first
		end
		@q_search = Question.first
		@q_fibonacci = Question.second

		render 'index'
	end

	def event
		@question = Question.find(params[:id])
		redirect_to root_id_path(@question) 
	end

	def tip_event
		if request.xhr?
			render json: @tips = Question.find_by_final_result(request.body.read.to_s).rules
		else
			render 'error'
		end
	end
end
