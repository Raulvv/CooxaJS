class CreateRules < ActiveRecord::Migration
  def change
    create_table :rules do |t|
    	t.string :expression
    	t.string :tip
    	t.boolean :mandatory
    	t.text :hint
    	t.integer :question_id
      t.timestamps
    end
  end
end
