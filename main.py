import random  
  
def create_board():  
    # 创建一个空的9x9数独板  
    board = [[0 for _ in range(9)] for _ in range(9)]  
      
    # 填充对角线上的3x3方块（更容易确保有效性）  
    fill_diagonal_blocks(board)  
      
    # 解决整个数独板  
    solve_sudoku(board)  
      
    # 随机挖空一些格子作为谜题  
    puzzle = create_puzzle(board) 
      
    return puzzle, board  
  
def fill_diagonal_blocks(board):  
    for i in range(0, 9, 3):  
        fill_block(board, i, i)  
  
def fill_block(board, row, col):  
    nums = list(range(1, 10))  
    random.shuffle(nums)  
      
    for i in range(3):  
        for j in range(3):  
            board[row + i][col + j] = nums.pop()  
  
def solve_sudoku(board):  
    find = find_empty_cell(board)  
    if not find:  
        return True  
    else:  
        row, col = find  
      
    for num in range(1, 10):  
        if is_valid(board, num, (row, col)):  
            board[row][col] = num  
              
            if solve_sudoku(board):  
                return True  
              
            board[row][col] = 0  
      
    return False  
  
def find_empty_cell(board):  
    for i in range(9):  
        for j in range(9):  
            if board[i][j] == 0:  
                return (i, j)  
    return None  
  
def is_valid(board, num, pos):  
    # 检查行  
    for i in range(9):  
        if board[pos[0]][i] == num and pos[1] != i:  
            return False  
      
    # 检查列  
    for i in range(9):  
        if board[i][pos[1]] == num and pos[0] != i:  
            return False  
      
    # 检查3x3方块  
    box_x = pos[1] // 3  
    box_y = pos[0] // 3  
      
    for i in range(box_y * 3, box_y * 3 + 3):  
        for j in range(box_x * 3, box_x * 3 + 3):  
            if board[i][j] == num and (i, j) != pos:  
                return False  
      
    return True  
  
def create_puzzle(board, difficulty=30):  
    # 难度级别：简单=20-30，中等=40-50，困难=50+  
    puzzle = [row[:] for row in board]  
    cells = [(i, j) for i in range(9) for j in range(9)]  
    random.shuffle(cells)  
      
    for i, j in cells[:difficulty]:  
        puzzle[i][j] = 0  
      
    return puzzle  
  
def print_board(board):  
    for i in range(9):  
        if i % 3 == 0 and i != 0:  
            print("- - - - - - - - - - -")  
          
        for j in range(9):  
            if j % 3 == 0 and j != 0:  
                print("| ", end="")  
                  
            if j == 8:  
                print(board[i][j] if board[i][j] != 0 else ".")  
            else:  
                print(str(board[i][j] if board[i][j] != 0 else ".") + " ", end="")  
  
# 生成并打印数独  
puzzle, solution = create_board()  
print("生成的数独谜题:")  
print_board(puzzle)  
print("\n数独的解决方案:")  
print_board(solution)  
