#include <bits/stdc++.h>

using namespace std;


vector<int> dfs(int a, unordered_map<int,unordered_set<int>> &m, unordered_map<int,int> visited, unordered_map<int,int> &feud, vector<int> &cnt)
{
    if(visited[a]==1)
        return {};
    
    visited[a] = 1;
    vector<int> tmp;
    for(auto j: m[a])
    {
        if(visited[j])
            continue;
        
        vector<int> t = dfs(j,m,visited,feud,cnt);
        for(int i=0;i<t.size();i++)
        {
            
            if(m[a].find(t[i])==m[a].end() and feud[a]!=t[i])
            {    cnt[a-1]++;
               
            }
            tmp.push_back(t[i]);
        }
        
    }
    tmp.push_back(a);
    return tmp;
}
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int n,mn,k;
    cin>>n>>mn>>k;
    unordered_map<int,int> visited;
    unordered_map<int,unordered_set<int>> m;
    unordered_map<int,int> feud;
    vector<int> cnt(n,0);
    
    for(int i=0;i<mn;i++)
    {
        int a,b;
        cin>>a>>b;
        visited[a]=0;
        visited[b]=0;
        
        if(m.find(a)==m.end())
            m.insert({a,{b}});
        else
            m[a].insert(b);
        
        if(m.find(b)==m.end())
            m.insert({b,{a}});
        else
            m[b].insert(a);
    }
    
    for(int i=0;i<k;i++)
    {
        int a,b;
        cin>>a>>b;
        feud[a] = b;
        feud[b] = a;
    }
    
    for(int i=1;i<=n;i++)
    {   dfs(i, m, visited, feud, cnt);
        cout<<cnt[i-1]<<" ";
    }
    return 0;
}
