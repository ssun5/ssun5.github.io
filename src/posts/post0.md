---
title: Post 0
---

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

<div class="card-container">
<!-- card-nth: look for the mark -->
<!-- include image of signatures -->
<div>

</div>


</div>

<div class="card-container">
    <!-- card1 -->
    <div class="card">
        <div>
            <img class="object-contain w-full h-full" src="/assets/img/test_image.png" alt="Tentacle arms">
        </div>
        <div class="title">
            <div class="font-bold text-xl mb-2">Test Image 1</div>
            <p class="text-gray-700 text-base">
                Above should show a picture of test image 1, depicting robotic tentacle arms.
            </p>
        </div>
        <div>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#one</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#two</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#animal</span>
        </div>
    </div>
    <!-- card2 -->
    <div class="card">
        <div>
            <img class="object-contain w-full h-full" src="/assets/img/test_image.png" alt="Tentacle arms">
        </div>
        <div class="title">
            <div class="font-bold text-xl mb-2">Test Image 1</div>
            <p class="text-gray-700 text-base">
                Above should show a picture of test image 1, depicting robotic tentacle arms.
            </p>
        </div>
        <div>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#one</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#two</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#animal</span>
        </div>
    </div>
</div>

**md strong**
<b>html bold</b>
*md em*
<i>html italic</i>


