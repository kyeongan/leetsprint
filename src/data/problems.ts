import type { Problem } from "../types/problem";

export const problems: Problem[] = [
  {
    id: "longest-substring-without-repeating-characters",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    priority: "Must Know",
    pattern: "Sliding Window",
    summary:
      "Scan a string and return the length of the longest contiguous segment that contains no duplicate characters.",
    whyItMatters:
      "This is the cleanest sliding-window signal for Audible and Amazon interviews. It shows whether you can track moving state, shrink correctly, and explain why each pointer only moves forward.",
    strategy: [
      "Walk the string once with a right pointer and remember the last index of each character.",
      "If the current character already appears inside the active window, move the left boundary just past the old index.",
      "Update the best window size after each step and never move the left pointer backward.",
    ],
    pitfalls: [
      "Do not blindly set left = last_seen[char] + 1; use max(left, last_seen[char] + 1) to avoid moving backward.",
      "Interviewers usually want the length, not the substring itself.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(min(n, charset))",
    },
    code: String.raw`def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    best = 0

    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1

        last_seen[char] = right
        best = max(best, right - left + 1)

    return best
`,
  },
  {
    id: "lru-cache",
    number: 146,
    title: "LRU Cache",
    difficulty: "Medium",
    priority: "Must Know",
    pattern: "Design + Doubly Linked List",
    summary:
      "Design a cache with O(1) average-time get and put, while evicting the least recently used key when capacity is exceeded.",
    whyItMatters:
      "This is a classic Audible/Amazon design-style coding question. It tests whether you can combine two data structures to satisfy strict performance constraints.",
    strategy: [
      "Use a dictionary from key to linked-list node for O(1) access.",
      "Use a doubly linked list to keep recency order, with the most recent node near the tail.",
      "On get and put, detach the node and move it to the recent side. When over capacity, evict the least recent node from the head side.",
    ],
    pitfalls: [
      "Sentinel head and tail nodes remove edge-case branching.",
      "When updating an existing key, remove the old node before reinserting the refreshed node.",
    ],
    complexity: {
      time: "O(1) get / O(1) put",
      space: "O(capacity)",
    },
    code: String.raw`class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.left = Node(0, 0)   # least recent side
        self.right = Node(0, 0)  # most recent side
        self.left.next = self.right
        self.right.prev = self.left

    def _remove(self, node: Node) -> None:
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _insert_recent(self, node: Node) -> None:
        prev_recent = self.right.prev
        prev_recent.next = node
        node.prev = prev_recent
        node.next = self.right
        self.right.prev = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._remove(node)
        self._insert_recent(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])

        node = Node(key, value)
        self.cache[key] = node
        self._insert_recent(node)

        if len(self.cache) > self.capacity:
            lru = self.left.next
            self._remove(lru)
            del self.cache[lru.key]
`,
  },
  {
    id: "binary-tree-level-order-traversal",
    number: 102,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    priority: "Must Know",
    pattern: "BFS + Queue",
    summary:
      "Traverse a binary tree level by level and return the node values grouped by depth.",
    whyItMatters:
      "This is the go-to BFS tree question. It is fast to discuss, quick to code, and gives you a chance to explain queue-driven traversal clearly.",
    strategy: [
      "Push the root into a queue if it exists.",
      "For each loop, measure the current queue size so you know exactly how many nodes belong to the same depth.",
      "Pop those nodes, collect their values, and push any children into the queue for the next round.",
    ],
    pitfalls: [
      "If the tree is empty, return an empty list immediately.",
      "Take the queue length before processing the level so you do not mix levels together.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(w) where w is the widest level",
    },
    code: String.raw`from collections import deque
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    queue = deque([root])
    result = []

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result
`,
  },
  {
    id: "word-ladder",
    number: 127,
    title: "Word Ladder",
    difficulty: "Medium",
    priority: "Must Know",
    pattern: "BFS + Graph",
    summary:
      "Given a starting word, an ending word, and a dictionary, compute the fewest one-letter transformations needed to reach the end.",
    whyItMatters:
      "This problem demonstrates shortest-path thinking on an implicit graph. It is a strong signal that you can model state transitions without building an explicit adjacency matrix.",
    strategy: [
      "Convert the word list to a set for O(1) membership checks.",
      "Run BFS from the starting word because BFS naturally finds the shortest number of transformations.",
      "For each position, try replacing the character with every letter a-z and push unseen valid words into the queue.",
    ],
    pitfalls: [
      "If the end word is missing from the dictionary, the answer is immediately 0.",
      "Remove a transformed word from the set as soon as it is queued to avoid duplicate work.",
    ],
    complexity: {
      time: "O(N * L * 26)",
      space: "O(N)",
    },
    code: String.raw`from collections import deque
from string import ascii_lowercase
from typing import List


def ladder_length(begin_word: str, end_word: str, word_list: List[str]) -> int:
    words = set(word_list)
    if end_word not in words:
        return 0

    queue = deque([(begin_word, 1)])

    while queue:
        word, steps = queue.popleft()
        if word == end_word:
            return steps

        for index in range(len(word)):
            prefix = word[:index]
            suffix = word[index + 1 :]

            for char in ascii_lowercase:
                next_word = prefix + char + suffix
                if next_word in words:
                    words.remove(next_word)
                    queue.append((next_word, steps + 1))

    return 0
`,
  },
  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    priority: "Must Know",
    pattern: "Hash Map",
    summary:
      "Return the two indices whose values add up to a target, assuming exactly one answer exists.",
    whyItMatters:
      "Even though it is easy, it is still the cleanest warm-up for explaining hash-map lookups, complements, and one-pass reasoning under interview pressure.",
    strategy: [
      "Walk the array once from left to right.",
      "For each number, compute the complement needed to reach the target.",
      "If the complement has already been seen, return the saved index and the current index; otherwise record the current number.",
    ],
    pitfalls: [
      "Store values as keys and indices as values in the dictionary.",
      "Check for the complement before inserting the current value so you do not accidentally reuse the same element.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    code: String.raw`from typing import List


def two_sum(nums: List[int], target: int) -> List[int]:
    seen = {}

    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]

        seen[value] = index

    return []
`,
  },
  {
    id: "merge-k-sorted-lists",
    number: 23,
    title: "Merge K Sorted Lists",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "Heap + Linked List",
    summary:
      "Merge multiple sorted linked lists into one sorted linked list as efficiently as possible.",
    whyItMatters:
      "This is a strong heap problem that also reveals whether you are comfortable with pointer manipulation. It feels hard, but the winning pattern is compact once you recognize it.",
    strategy: [
      "Push the head of each non-empty list into a min-heap keyed by node value.",
      "Repeatedly pop the smallest node, append it to the answer list, and push that node’s next pointer if it exists.",
      "Use a dummy head so the merge loop stays simple.",
    ],
    pitfalls: [
      "Python heap entries need a tiebreaker index when node values can be equal.",
      "Remember to advance the tail after attaching the popped node.",
    ],
    complexity: {
      time: "O(N log K)",
      space: "O(K)",
    },
    code: String.raw`import heapq
from typing import List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def merge_k_lists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    heap = []

    for index, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, index, node))

    dummy = ListNode()
    tail = dummy

    while heap:
        _, index, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next

        if node.next:
            heapq.heappush(heap, (node.next.val, index, node.next))

    return dummy.next
`,
  },
  {
    id: "number-of-islands",
    number: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "DFS + Matrix",
    summary:
      "Count how many disconnected land masses exist in a 2D grid of land and water.",
    whyItMatters:
      "This is a reliable grid traversal question. It checks whether you can translate adjacency rules into DFS or BFS without getting lost in bounds logic.",
    strategy: [
      "Scan every cell in the grid.",
      "When you see unvisited land, increment the island count and run DFS to mark the full component.",
      "Use four-direction movement and mutate the grid or track a visited set.",
    ],
    pitfalls: [
      "Bounds checks should happen before touching the grid cell.",
      "Use four directions unless the interviewer explicitly says diagonals also connect islands.",
    ],
    complexity: {
      time: "O(m * n)",
      space: "O(m * n) in the worst case",
    },
    code: String.raw`from typing import List


def num_islands(grid: List[List[str]]) -> int:
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    islands = 0

    def dfs(row: int, col: int) -> None:
        if row < 0 or row >= rows or col < 0 or col >= cols:
            return
        if grid[row][col] != '1':
            return

        grid[row][col] = '0'
        dfs(row + 1, col)
        dfs(row - 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == '1':
                islands += 1
                dfs(row, col)

    return islands
`,
  },
  {
    id: "top-k-frequent-elements",
    number: 347,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "Hash Map + Heap",
    summary: "Return the k values that appear most often in an array.",
    whyItMatters:
      "This is a good follow-up problem after frequency-count warmups. It lets you compare sorting, heaps, and bucket sort depending on the time constraints.",
    strategy: [
      "Count frequencies with a dictionary or Counter.",
      "Use a heap-based helper to extract the k most frequent keys.",
      "If the interviewer asks for linear time, mention bucket sort as an alternative.",
    ],
    pitfalls: [
      "Do not sort the full array when k is much smaller unless the interviewer accepts O(n log n).",
      "If you use Counter.most_common, still explain the underlying idea instead of treating it as magic.",
    ],
    complexity: {
      time: "O(n log k)",
      space: "O(n)",
    },
    code: String.raw`from collections import Counter
import heapq
from typing import List


def top_k_frequent(nums: List[int], k: int) -> List[int]:
    counts = Counter(nums)
    heap = []

    for value, frequency in counts.items():
        heapq.heappush(heap, (frequency, value))
        if len(heap) > k:
            heapq.heappop(heap)

    return [value for _, value in heap]
`,
  },
  {
    id: "minimum-window-substring",
    number: 76,
    title: "Minimum Window Substring",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "Sliding Window",
    summary:
      "Find the shortest substring in a source string that covers every required character from a target string, including duplicates.",
    whyItMatters:
      "This is one of the highest-value sliding-window interviews because it forces you to manage requirements, counts, and shrinking logic at the same time.",
    strategy: [
      "Count how many of each target character must be included.",
      "Expand the right pointer until the window satisfies all required counts.",
      "Then shrink from the left while the window remains valid, updating the best answer whenever the window gets smaller.",
    ],
    pitfalls: [
      "The requirement is about character counts, not just set membership.",
      "Track both required distinct characters and how many are currently satisfied to know when the window is valid.",
    ],
    complexity: {
      time: "O(|s| + |t|)",
      space: "O(|t|)",
    },
    code: String.raw`from collections import Counter


def min_window(s: str, t: str) -> str:
    if not s or not t:
        return ''

    need = Counter(t)
    window = {}
    have = 0
    required = len(need)
    best = (float('inf'), 0, 0)
    left = 0

    for right, char in enumerate(s):
        window[char] = window.get(char, 0) + 1

        if char in need and window[char] == need[char]:
            have += 1

        while have == required:
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)

            left_char = s[left]
            window[left_char] -= 1
            if left_char in need and window[left_char] < need[left_char]:
                have -= 1
            left += 1

    if best[0] == float('inf'):
        return ''

    _, start, end = best
    return s[start : end + 1]
`,
  },
  {
    id: "lowest-common-ancestor-of-a-binary-tree",
    number: 236,
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "DFS + Tree",
    summary:
      "Given a binary tree and two nodes, find the deepest node that is an ancestor of both.",
    whyItMatters:
      "LCA is a fundamental tree question that tests recursive thinking and the ability to propagate information up the call stack. It appears frequently in interviews as a standalone problem and as a building block for harder tree problems.",
    strategy: [
      "Recurse into both left and right subtrees looking for p and q.",
      "If the current node is p or q, return it immediately without searching further.",
      "If both subtrees return a non-null result, the current node is the LCA; otherwise propagate whichever side found something.",
    ],
    pitfalls: [
      "The base case must return null for missing nodes and return the node itself when it matches p or q.",
      "Do not assume the tree is a BST — you cannot use value comparisons to navigate.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h) where h is the tree height",
    },
    code: String.raw`from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowest_common_ancestor(
    root: Optional[TreeNode],
    p: TreeNode,
    q: TreeNode,
) -> Optional[TreeNode]:
    if root is None or root is p or root is q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    if left and right:
        return root

    return left if left else right
`,
  },
  {
    id: "search-in-rotated-sorted-array",
    number: 33,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    priority: "High Value",
    pattern: "Binary Search",
    summary:
      "Find a target in a sorted array that has been rotated at an unknown pivot, while preserving logarithmic search time.",
    whyItMatters:
      "This is an excellent binary-search variation because it tests whether you can reason about sorted halves rather than memorizing one exact template.",
    strategy: [
      "Run binary search with left and right pointers.",
      "At each step, decide which half is normally sorted by comparing nums[left] and nums[mid].",
      "If the target falls inside the sorted half, narrow there; otherwise search the other half.",
    ],
    pitfalls: [
      "Keep the interval updates strict: use mid + 1 and mid - 1 so the loop makes progress.",
      "State clearly why one side must always be sorted when values are distinct.",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
    },
    code: String.raw`from typing import List


def search_rotated(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
`,
  },
];
