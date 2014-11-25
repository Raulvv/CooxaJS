class QuestionsController < ApplicationController
  respond_to :json

  def show
    @question = Question.find(params[:id])
  end

end
