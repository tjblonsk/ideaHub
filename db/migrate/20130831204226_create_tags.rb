class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|

      t.timestamps
    end
  end

  def down
    drop_table :tags
  end
end
