class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
    	t.string :question
    	t.string :question_code
    	t.text :explanation
    	t.string :final_result
      t.timestamps
    end
  end
end
