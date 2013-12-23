---
layout: post
title: 'Rubyで A*アルゴリズム を実装する'
date: 2013-01-07
tags: [Ruby]
description: 'A*アルゴリズム(A-star algorithm)とは探索アルゴリズムの一種で、最短経路っぽいものを探していく方法です。'
---

[A*アルゴリズム(A-star algorithm)](http://ja.wikipedia.org/wiki/A* "A* - Wikipedia" )とは探索アルゴリズムの一種で、
すっげー簡単に言うと

- スタート地点からどれだけ進んだか(コスト)
- あとどれくらいでゴールに着けそうか(ヒューリスティックコスト)

という情報から最短経路っぽいものを探していく方法です。

以下の記事をかなり参考にしました。
[A-starアルゴリズム » 2dgames.jp](http://2dgames.jp/2012/05/22/a-starar/)

というかぶっちゃけRubyの練習なので、「この書き方はおかしい」とか「このやり方はスマートじゃない」とかツッコんでいただけると嬉しいです(´・ω・)

``` ruby
# maze.rb

class Maze
	ROOT='0'; WALL='1'; START='2'; GOAL='3'

	def initialize(map=nil, vec=nil)
		self.parseMap(map) if map
		unless vec
			vec = []
			for i in 0..3
				j = i%3==0 ? 1 : -1
				vec[i] = { :x=>(i+1)%2*j, :y=>i%2*j }
			end
		end
		@vec = vec
	end

	# マップ文字列を展開する
	def parseMap(map)
		@map = map.split("\n").map{|line| line.split }
		@size = Hash[*[[:x,:y],@map.shift.map{|val|val.to_i}].transpose.flatten]
		@map.each_with_index do |line,i|
			line.each_with_index do |val,j|
				@start = {:x=>j, :y=>i} if val==START
				@goal  = {:x=>j, :y=>i} if val==GOAL
			end
		end
	end

	# 探索開始
	def search()
		self.openNode(nil, pos=@start, cost=0)
		loop do
			cost += 1
			@vec.each do |vec|
				newPos = { :x=>pos[:x]+vec[:x], :y=>pos[:y]+vec[:y] }
				self.openNode(@map[pos[:y]][pos[:x]], newPos, cost)
				return true if newPos==@goal
			end
			self.closeNode(pos)
			return false unless pos=self.getNextPos()
		end
	end

	# OPENノードからコストが最小のノードを選ぶ
	def getNextPos()
		minScore = nil
		minNode = []
		for j in 0..@size[:y]-1
			for i in 0..@size[:x]-1
				if @map[j][i].is_a?(AStar) && @map[j][i].status===true then
					if !minScore || minScore>@map[j][i].score then
						minScore = @map[j][i].score
						minNode = [{ :x=>i, :y=>j }]
					elsif minScore==@map[j][i].score then
						minNode.push({ :x=>i, :y=>j })
					end
				end
			end
		end
		return minNode.length ? minNode[rand(minNode.length)] : false
	end

	# ノードを開く
	def openNode(parent, pos, cost)
		x=pos[:x]; y=pos[:y]
		return false if x<0 || y<0 || x>=@size[:x] || y>=@size[:y]
		return false if @map[y][x].is_a?(AStar) || @map[y][x]==WALL
		@map[y][x] = AStar.new(parent, cost, self.calcHeuristic(pos), pos)
		return true
	end

	# ノードを閉じる
	def closeNode(pos)
		@map[pos[:y]][pos[:x]].status = false
	end

	# ヒューリスティックコストを計算する
	def calcHeuristic(pos)
		x = pos[:x] - @goal[:x]
		y = pos[:y] - @goal[:y]
		return Math.sqrt(x*x+y*y).to_i
	end

	# スタートからゴールまでの道筋を辿る
	def getRoot()
		root=[]; node=@map[@goal[:y]][@goal[:x]]
		loop do
			return root.reverse unless node
			return false unless node.is_a?(AStar)
			root.push(node.pos)
			node = node.parent
		end
	end
end

class AStar
	attr_accessor :status, :cost, :heuristic, :pos, :score, :parent

	def initialize(parent, cost, heuristic, pos)
		@status = true
		@parent=parent; @cost=cost; @heuristic=heuristic; @pos=pos
		self.calcScore()
	end

	def calcScore
		@score = @cost + @heuristic
	end
end
```

``` ruby
# index.rb

require 'maze.rb'

# マップ文字列（１行目はマップの大きさ）
# 0:通路 1:壁 2:スタート地点 3:ゴール
map = <<EOM
6 5
1 1 1 2 1 1
1 0 0 0 1 1
1 1 0 1 0 1
1 1 0 0 0 3
1 1 1 1 1 1
EOM

maze = Maze.new(map)

maze.search()

p maze.getRoot()
```

で、これを実行すると

``` bash
$ ruby index.rb
[{:y=>0, :x=>3}, {:y=>1, :x=>3}, {:y=>1, :x=>2}, {:y=>2, :x=>2}, {:y=>3, :x=>2}, {:y=>3, :x=>3}, {:y=>3, :x=>4}, {:y=>3, :x=>5}]
```

最短経路が求められた！！(・∀・)となります（わかりにくいですが
