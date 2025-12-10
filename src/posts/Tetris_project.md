---
title: Autonomous Tetris Agent
date: '2020-06-01'
---

# Introduction

In this project, I use reinforcement learning techniques to train a computer agent to play the game of *Tetris*. The computer agent is defined on a set of cost/reward functions and optimized through 
using simple vanilla policy gradient (VPG) training techniques.

The goal of an intelligent agent in this game is straightforward: to clear as many rows as possible. As this game is a NP-problem by nature — we can realistically only asses the performance of the agent after it has already played a game — 


In this project, I use reinforcement learning to train an AI agent to play the game of Tetris. The agent is defined and trained with a custom set of cost functions in conjunction with vanilla policy gradient (VPG) training techniques.

The goal of an intelligent agent for Tetris is to clear as many rows as possible. For this project, the puzzle pieces are selected at random at each stage and the agent has no knowledge of the future sequence. The game plays until the puzzle stack overflows past the height limit (horizontal red line). The agent is strictly only allowed to drop a piece directly down into position. Note that variants of the game may have slightly different game rules.

Under the given game definitions, the problem of creating an intelligent agent is a NP-problem, meaning that we can only assess the performance of the agent after it has played a game. At first glance, one might try to optimize the agent by maximizing the number of rows cleared at each stage. However, through experiments, it quickly becomes clear that such a direct ('greedy') policy does not yield a very intelligent agent. Instead, we are able to achieve signficant improvements if we approach the problem with metaheuristics. These metrics are implemented through custom cost functions which are combined as a weighted sum to produce a policy (decision at each stage). 

My primary interest in this project was to define these cost functions and to optimize their corresponding weights. The optimization strategy falls under the category of stochastic optimization, in which random perturbation is employed to adjust the weight (solution) vector. 

# Meow 

some math reference things, \\(y=m x+ b\\), math stuffs

$$
block math
$$

\begin{equation}\label{complex}
e^{\pi i} + 1 = 0
\end{equation}

\begin{equation}
E = mc^2
\label{eq:einstein}
\end{equation}

refer to eqn \ref{eq:einstein}

{% for post in collections.post %}
    123
  <h2>{{ post.data.title }}</h2>
{% endfor %}

{% set items = [
  { image: '/assets/img/test_image.png', title: 'Flexible Robotic Tentacle', caption: 'Caption for test image 1. Should show an image of a robotic tentacle.' },
  { image: '/assets/img/test_image.png', title: 'Flexible Robotic Tentacle', caption: 'Caption for test image 1. Should show an image of a robotic tentacle.' }
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) | safe }}

**md strong**
<b>html bold</b>
*md em*
<i>html italic</i>


