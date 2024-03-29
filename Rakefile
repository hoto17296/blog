EDITOR = 'vim'

namespace :blog do

  desc '新しいエントリを作成'
  task :new, [:title] do |task, args|
    raise 'Usage: rake blog:new[title]' if args.title.nil?
    date = Time.now.strftime("%Y-%m-%d")
    file = "_posts/#{date}-#{args.title}.md"
    raise file + ' is already exist.' if File.exist?(file)
    File.open(file, 'w'){|f| f.write template date }
    editor file
  end

  desc 'エントリを編集'
  task :edit, [:search] do |task, args|
    if args.search.nil?
      post = Dir::glob("_posts/*.md").last
      raise "No post." if post.nil?
    else
      post = Dir::glob("_posts/*#{args.search}*.md").last
      raise "Post '#{args.search}' is not found." if post.nil?
    end
    editor post
  end

  desc 'エントリ一覧'
  task :list do
    puts `ls _posts/`
  end

  desc 'エントリを表示'
  task :preview do
    if running?
      Rake::Task['blog:server:start'].execute
      puts 'Starting Jekyll Server...'
      sleep 2
    end
    `open http://0.0.0.0:4000`
  end

  namespace :server do

    desc 'Jekyllサーバを起動'
    task :start do
      raise 'Already running.' unless running?
      `jekyll serve -w > /dev/null &`
    end

    desc 'Jekyllサーバを停止'
    task :stop do
      `kill #{pid}` unless running?
    end

    desc 'Jekyllサーバを再起動'
    task :restart => [:stop, :start]

    def pid
      pid = `ps x | grep jekyll | grep -v grep | awk '{print $1}'`
      pid.empty? ? nil : pid
    end

    def running?
      pid.nil?
    end

  end

  def editor(file)
    `#{EDITOR} #{file} < \`tty\` > \`tty\``
  end

  def template(date)
<<"EOS"
---
layout: post
title: ''
date: #{date}
tags: []
description: ''
image: ''
---
EOS
  end

end
