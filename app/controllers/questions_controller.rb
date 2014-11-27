class QuestionsController < ApplicationController
  respond_to :json

  def show
    question = Question.find(params[:id])
    respond_with(question)
  end

end
